package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type VWBLApi struct {
	baseURL string
	client  *http.Client
}

func NewVWBLApi(endpointURL string) *VWBLApi {
	return &VWBLApi{
		baseURL: endpointURL,
		client:  &http.Client{},
	}
}

func (api *VWBLApi) SetKey(documentId, chainId, key, signature, address string) error {
	requestBody, err := json.Marshal(map[string]interface{}{
		"document_id":    documentId,
		"chain_id":       chainId,
		"key":            key,
		"signature":      signature,
		"address":        address,
		"has_nonce":      false,
		"auto_migration": false,
	})
	if err != nil {
		return err
	}

	resp, err := api.client.Post(fmt.Sprintf("%s/keys", api.baseURL), "application/json", bytes.NewBuffer(requestBody))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to set key: %s", resp.Status)
	}
	return nil
}

func (api *VWBLApi) GetKey(documentId, chainId, signature, address string) (string, error) {
	url := fmt.Sprintf("%s/keys/%s/%s?signature=%s&address=%s", api.baseURL, documentId, chainId, signature, address)
	resp, err := api.client.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to get key: %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var result struct {
		DocumentKey struct {
			Key string `json:"key"`
		} `json:"documentKey"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return "", err
	}

	return result.DocumentKey.Key, nil
}

func (api *VWBLApi) GetSignMessage(contractAddress, chainId, address string) (string, error) {
	url := fmt.Sprintf("%s/signature/%s/%s?address=%s", api.baseURL, contractAddress, chainId, address)
	resp, err := api.client.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to get sign message: %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var result struct {
		SignMessage string `json:"signMessage"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return "", err
	}

	return result.SignMessage, nil
}
