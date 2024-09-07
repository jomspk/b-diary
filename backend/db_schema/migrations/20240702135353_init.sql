-- migrate:up
CREATE TABLE users
(
    id         VARCHAR(26) NOT NULL COMMENT 'ID',
    tenant_id  VARCHAR(36) NOT NULL COMMENT 'テナントID',
    name       VARCHAR(64) NOT NULL COMMENT 'ユーザ名',
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

CREATE TABLE cards
(
    id                 VARCHAR(26)               NOT NULL COMMENT 'ID',
    tenant_id          VARCHAR(36)               NOT NULL COMMENT 'テナントID',
    name               VARCHAR(64)               NOT NULL COMMENT 'カード名',
    owner_id           VARCHAR(26)               NOT NULL COMMENT 'カード所有ユーザID',
    state              ENUM ('active', 'locked') NOT NULL COMMENT 'カードステート（active:有効、locked:一時停止）',
    last_four          VARCHAR(26) COMMENT 'カード番号下4桁',
    expiration_month   INT(2) COMMENT 'カード有効期限(月)',
    expiration_year    INT(2) COMMENT 'カード有効期限(年)',
    description        VARCHAR(255)              NOT NULL COMMENT 'カード説明文',
    once_max_amount    INT(10) unsigned COMMENT '1回あたりの利用上限金額',
    monthly_max_amount INT(10) unsigned COMMENT '月ごとの利用上限金額',
    total_max_amount   BIGINT(20) unsigned COMMENT '累計の利用上限金額',
    start_date         DATE COMMENT 'カード利用開始日',
    end_date           DATE COMMENT 'カード利用終了日',
    modified_at        TIMESTAMP                 NOT NULL,
    created_at         TIMESTAMP                 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP                 NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES users (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

CREATE TABLE card_viewers
(
    id         VARCHAR(26) NOT NULL COMMENT 'ID',
    tenant_id  VARCHAR(36) NOT NULL COMMENT 'テナントID',
    card_id    VARCHAR(26) NOT NULL COMMENT 'カードID',
    user_id    VARCHAR(26) NOT NULL COMMENT 'ユーザID',
    created_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY `uq_card_viwers_card_id_user_id` (`card_id`, `user_id`),
    FOREIGN KEY (card_id) REFERENCES cards (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_bin;

-- migrate:down
DROP TABLE `card_viewers`;
DROP TABLE `cards`;
DROP TABLE `users`;
