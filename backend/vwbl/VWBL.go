package vwbl

import (
	"context"
	"crypto/ecdsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"lxcard/backend/vwbl/api"
	"math/big"
	"os"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/google/uuid"
)

type VWBL struct {
	api             *api.VWBLApi
	contractAddress common.Address
	userAddress     common.Address
	privateKey      *ecdsa.PrivateKey
	client          *ethclient.Client
	contract        *bind.BoundContract
	chainID         string
	signature       string
	vwblNetworkURL  string
}

type VWBLProps struct {
	ContractAddress string
	ProviderURL     string
	PrivateKey      string
	ChainID         string
	UserAddress     string
	VwblNetworkURL  string
}

func NewVWBL(props VWBLProps) (*VWBL, error) {
	client, err := ethclient.Dial(props.ProviderURL)
	if err != nil {
		return nil, err
	}

	privateKey, err := crypto.HexToECDSA(props.PrivateKey)
	if err != nil {
		return nil, err
	}

	contractAddress := common.HexToAddress(props.ContractAddress)
	userAddress := common.HexToAddress(props.UserAddress)

	api := api.NewVWBLApi(props.VwblNetworkURL)

	// Read ABI from file
	abiJSON, err := os.ReadFile("./backend/contract/VWBLERC721.json")
	if err != nil {
		return nil, err
	}

	contractAbi, err := abi.JSON(strings.NewReader(string(abiJSON)))
	if err != nil {
		return nil, err
	}

	contract := bind.NewBoundContract(contractAddress, contractAbi, client, client, client)

	if contract == nil {
		return nil, fmt.Errorf("failed to create bound contract")
	}

	return &VWBL{
		api:             api,
		contractAddress: contractAddress,
		userAddress:     userAddress,
		privateKey:      privateKey,
		client:          client,
		contract:        contract,
		chainID:         props.ChainID,
		vwblNetworkURL:  props.VwblNetworkURL,
	}, nil
}

func (v *VWBL) Sign() error {
	signMessage, err := v.api.GetSignMessage(v.contractAddress.Hex(), v.chainID, v.userAddress.Hex())
	if err != nil {
		return err
	}

	v.signature, err = signToProtocol(signMessage, v.privateKey)
	return err
}

func (v *VWBL) GenerateTokenURI(name, description, testKey string) string {
	encryptedText := encryptAES(description, testKey)
	encryptedJSON, _ := json.Marshal(map[string]string{
		"name":        name,
		"description": encryptedText,
		"image":       "",
	})
	encodedJSON := base64.StdEncoding.EncodeToString(encryptedJSON)
	return "data:application/json;base64," + encodedJSON
}

func (v *VWBL) MintInitialDiary(name, description, userID string) (TokenInfo, error) {
	if v.signature == "" {
		return TokenInfo{}, fmt.Errorf("please sign first")
	}

	hashedUser := crypto.Keccak256Hash([]byte(userID))
	testKey := uuid.New().String()
	documentID := crypto.Keccak256Hash(crypto.Keccak256(nil))

	tokenInfo, err := v.Mint(name, description, testKey, documentID, hashedUser)
	if err != nil {
		return TokenInfo{}, err
	}

	err = v.api.SetKey(documentID.Hex(), v.chainID, testKey, v.signature, v.userAddress.Hex())
	if err != nil {
		return TokenInfo{}, err
	}

	return tokenInfo, nil
}

func (v *VWBL) Mint(name, description, key string, documentID, hashedUser common.Hash) (TokenInfo, error) {
	tokenURI := v.GenerateTokenURI(name, description, key)

	callOpt := &bind.CallOpts{
		Pending: true,
		Context: context.Background(),
	}

	var feeHex []interface{}
	err := v.contract.Call(callOpt, &feeHex, "getFee")
	if err != nil {
		return TokenInfo{}, err
	}
	fee := new(big.Int).SetBytes(feeHex[0].([]byte))

	chainIDBigInt, ok := new(big.Int).SetString(v.chainID, 10)
	if !ok {
		return TokenInfo{}, fmt.Errorf("invalid chainID: %s", v.chainID)
	}
	auth, err := bind.NewKeyedTransactorWithChainID(v.privateKey, chainIDBigInt)
	if err != nil {
		return TokenInfo{}, err
	}
	auth.Value = fee

	tx, err := v.contract.Transact(auth, "mintInitialDiary", tokenURI, documentID, hashedUser)
	if err != nil {
		return TokenInfo{}, err
	}

	receipt, err := bind.WaitMined(context.Background(), v.client, tx)
	if err != nil {
		return TokenInfo{}, err
	}

	eventLog := v.getEventLog(receipt)

	fmt.Printf("eventLog: %v\n", eventLog)

	// tokenID, err := v.decodeTokenID(eventLog[0])
	// if err != nil {
	// 	return TokenInfo{}, err
	// }

	return TokenInfo{
		TokenID:    big.NewInt(1),
		DocumentID: documentID,
	}, nil
}

func (v *VWBL) getEventLog(receipt *types.Receipt) []types.Log {
	var eventLogs []types.Log
	for _, log := range receipt.Logs {
		if log.Address == v.contractAddress {
			if log.Topics[0] == common.HexToHash("0x4cc0a9c4a99ddc700de1af2c9f916a7cbfdb71f14801ccff94061ad1ef8a8040") {
				eventLogs = append(eventLogs, *log)
			}
		}
	}
	return eventLogs
}

// func (v *VWBL) decodeTokenID(log types.Log) (*big.Int, error) {
// 	contractAbi, err := abi.JSON(strings.NewReader(VWBLERC721ABI))
// 	if err != nil {
// 		return nil, err
// 	}

// 	event := struct {
// 		From    common.Address
// 		To      common.Address
// 		TokenID *big.Int
// 	}{}

// 	err = contractAbi.UnpackIntoInterface(&event, "Transfer", log.Data)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return event.TokenID, nil
// }

// func (v *VWBL) GetTokenURI(tokenID *big.Int) (string, error) {
// 	callOpt := &bind.CallOpts{
// 		Pending: true,
// 		Context: context.Background(),
// 	}
// 	var tokenURIHex []interface{}
// 	err := v.contract.Call(callOpt, &tokenURIHex, "tokenURI", tokenID)
// 	if err != nil {
// 		return "", err
// 	}
// 	tokenURI := string(tokenURIHex[0].([]byte))

// 	base64Data := tokenURI
// 	startIndex := strings.Index(base64Data, ",") + 1
// 	metaData := base64Data[startIndex:]
// 	decodedMetaData, err := base64.StdEncoding.DecodeString(metaData)
// 	if err != nil {
// 		return "", err
// 	}

// 	return string(decodedMetaData), nil
// }

func (v *VWBL) DecryptMetaData(encryptedData string, documentID common.Hash) (string, error) {
	key, err := v.GetKey(documentID)
	if err != nil {
		return "", err
	}

	decryptedData := decryptAES(encryptedData, key)
	return decryptedData, nil
}

func (v *VWBL) GetKey(documentID common.Hash) (string, error) {
	return v.api.GetKey(documentID.Hex(), v.chainID, v.signature, v.userAddress.Hex())
}

// Helper functions (you'll need to implement these)
func signToProtocol(message string, privateKey *ecdsa.PrivateKey) (string, error) {

    // メッセージをハッシュ化
    msgHash := crypto.Keccak256([]byte(message))

    // 署名
    signature, err := crypto.Sign(msgHash, privateKey)
    if err != nil {
        return "", fmt.Errorf("署名に失敗しました: %v", err)
    }

    return fmt.Sprintf("0x%x", signature), nil
}

func encryptAES(plaintext, key string) string {
	// Implement AES encryption
	return ""
}

func decryptAES(ciphertext, key string) string {
	// Implement AES decryption
	return ""
}

type TokenInfo struct {
	TokenID    *big.Int
	DocumentID common.Hash
}