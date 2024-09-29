-- migrate:up

-- bdiary_usersテーブルにデータを挿入
INSERT INTO bdiary_users (id, wallet_address, firebase_uid) VALUES
('user_001', '0x1234567890abcdef1234567890abcdef12345678', 'firebase_uid_001'),
('user_002', '0xabcdef1234567890abcdef1234567890abcdef12', 'firebase_uid_002'),
('user_003', NULL, 'firebase_uid_003');  -- ウォレットアドレスがまだないユーザーの場合

-- create_diariesテーブルにデータを挿入
INSERT INTO create_diaries (id, user_id, save_to_bc_at, token_id, encryption_key, content, title, diary_date) VALUES
('diary_001', 'user_001', '2024-09-29 12:00:00', 1001, 'encryption_key_001', '圧縮済み日記の内容1', 'タイトル1', '2024-09-29'),
('diary_002', 'user_002', NULL, 1002, 'encryption_key_002', '圧縮済み日記の内容2', 'タイトル2', '2024-09-28'),
('diary_003', 'user_003', '2024-09-28 08:30:00', 1003, 'encryption_key_003', '圧縮済み日記の内容3', 'タイトル3', '2024-09-27');


-- migrate:down
