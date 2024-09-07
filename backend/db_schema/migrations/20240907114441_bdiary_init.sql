-- migrate:up

CREATE TABLE bdiary_user (
    id             VARCHAR(26) NOT NULL COMMENT 'ID',
    wallet_address VARCHAR(52) NULL COMMENT '42文字の公開ウォレットアドレス',
    firebase_uid   VARCHAR(52) NOT NULL COMMENT 'Firebase UID',
    has_diary      BOOLEAN NOT NULL COMMENT '日記の有無',
    PRIMARY KEY (id),
    UNIQUE KEY `bdiary_user_wallet_address_unique` (wallet_address),
    UNIQUE KEY `bdiary_user_firebase_uid_unique` (firebase_uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE encryption_key (
    id              VARCHAR(26) NOT NULL COMMENT 'ID',
    encryption_key  VARCHAR(74) NOT NULL COMMENT '64文字の暗号化キー',
    key_token_id    BIGINT NOT NULL COMMENT 'NFTトークンID',
    user_id         VARCHAR(26) NOT NULL COMMENT 'ユーザID',
    applied_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '適用日',
    unapplied_at    TIMESTAMP DEFAULT NULL COMMENT '非適用日',
    PRIMARY KEY (id),
    UNIQUE KEY ecrypt_key_encryption_key_unique (encryption_key),
    UNIQUE KEY ecrypt_key_key_token_id_unique (key_token_id),
    FOREIGN KEY (user_id) REFERENCES bdiary_user (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE diary (
    id                  VARCHAR(26) NOT NULL COMMENT 'ID',
    token_id            BIGINT DEFAULT NULL COMMENT 'NFTトークンID',
    content             VARCHAR(255) NOT NULL COMMENT '圧縮済み日記',
    title               VARCHAR(64) NOT NULL COMMENT '圧縮済みタイトル',
    PRIMARY KEY (id),
    UNIQUE KEY diary_token_id_unique (token_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE create_diary (
    id             VARCHAR(26) NOT NULL COMMENT 'ID',
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    encryption_key_id VARCHAR(26) DEFAULT NULL COMMENT '暗号化キーID',
    algo           VARCHAR(64) DEFAULT NULL COMMENT '暗号化アルゴリズム',
    user_id        VARCHAR(26) NOT NULL COMMENT 'ユーザID',
    diary_id       VARCHAR(26) NOT NULL COMMENT '日記ID',
    save_to_bc_at  TIMESTAMP DEFAULT NULL COMMENT 'ブロックチェーン保存日時',
    PRIMARY KEY (id),
    FOREIGN KEY (encryption_key_id) REFERENCES encryption_key (id),
    FOREIGN KEY (user_id) REFERENCES bdiary_user (id),
    FOREIGN KEY (diary_id) REFERENCES diary (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- migrate:down

DROP TABLE IF EXISTS create_diary;
DROP TABLE IF EXISTS diary;
DROP TABLE IF EXISTS encryption_key;
DROP TABLE IF EXISTS bdiary_user;
