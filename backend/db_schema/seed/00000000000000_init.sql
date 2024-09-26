-- migrate:up

-- 1. bdiary_users テーブルにデータを挿入
INSERT INTO bdiary_users (id, wallet_address, firebase_uid, has_diary) VALUES
('usr_01', '0x1234567890ABCDEF1234567890ABCDEF12345678', 'firebase_uid_01', TRUE),
('usr_02', '0x0987654321FEDCBA0987654321FEDCBA09876543', 'firebase_uid_02', FALSE),
('usr_03', '0xABCDEF1234567890ABCDEF1234567890ABCDEF12', 'firebase_uid_03', TRUE);

-- 2. encryption_keys テーブルにデータを挿入
INSERT INTO encryption_keys (id, encryption_key, key_token_id, user_id, applied_at, unapplied_at) VALUES
('enc_key_01', '3f5a6e1b9a93f5a6e1b9a93f5a6e1b9a93f5a6e1b9a93f5a6e1b9a93f5a6e1b', 10001, 'usr_01', '2024-09-26 10:00:00', NULL),
('enc_key_02', '1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a2b3c4d5e6f1a', 10002, 'usr_02', '2024-09-26 11:00:00', NULL),
('enc_key_03', '9f8e7d6c5b4a9f8e7d6c5b4a9f8e7d6c5b4a9f8e7d6c5b4a9f8e7d6c5b4a9f8e', 10003, 'usr_03', '2024-09-26 12:00:00', NULL);

-- 3. create_diaries テーブルにデータを挿入
INSERT INTO create_diaries (id, created_at, encryption_key_id, user_id, save_to_bc_at, token_id, content, title, diary_date) VALUES
('diary_01', '2024-09-26 09:00:00', 'enc_key_01', 'usr_01', NULL, 20001, 'This is a sample compressed diary content.', 'Sample Title 1', '2024-09-25'),
('diary_02', '2024-09-26 10:00:00', 'enc_key_02', 'usr_02', '2024-09-26 10:30:00', 20002, 'Another sample compressed diary content.', 'Sample Title 2', '2024-09-24'),
('diary_03', '2024-09-26 11:00:00', 'enc_key_03', 'usr_03', NULL, 20003, 'Yet another sample compressed diary content.', 'Sample Title 3', '2024-09-23');


-- migrate:down
