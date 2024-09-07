#!/usr/bin/env bash

set -eu

handle_error() {
    echo -e "\e[31mエラーが発生しました: $1\e[0m" >&2
    exit 1
}

# GitHub Actionsでの実行チェック
if [ -n "${GITHUB_ACTIONS:-}" ]; then
    echo "GitHub Actionsで実行中です。セットアップをスキップします。"
    exit 0
fi

# ユーザーに確認を求める
read -p "初期セットアップを実行しますか？ (y/N): " answer
if [[ ! $answer =~ ^[Yy]$ ]]; then
    echo "初期セットアップをスキップしました。"
    exit 0
fi

# SKIP_INITのチェック
if [ "${SKIP_INIT:-false}" = "true" ]; then
    echo "SKIP_INIT=trueのため、セットアップをスキップします。"
    exit 0
fi

# pueueデーモンが起動していない場合は起動する
if ! pueue status &>/dev/null; then
    echo -e "\e[33mpueueデーモンを起動しています...\e[0m"
    pueued --daemonize
    sleep 2  # デーモンの起動を待つ
fi

# タスクを定義
tasks=(
    "make go-install-tools"
    "pnpm install"
)

# タスクIDを格納する配列
task_ids=()

# タスクを追加
for task in "${tasks[@]}"; do
    output=$(pueue add "$task")
    task_id=$(echo "$output" | grep -oP '(?<=\(id )\d+')
    if [[ -z "$task_id" ]]; then
        handle_error "タスクの追加に失敗しました: $output"
    fi
    task_ids+=("$task_id")
    echo -e "\e[33mタスクを追加しました。ID: $task_id\e[0m"
    echo -e "\e[90mコマンド: $task\e[0m"
    echo ""
done

pueue start

# すべてのタスクの完了を待つ
echo -e "\e[33mタスクの完了を待っています...\e[0m"
pueue wait "${task_ids[@]}" || handle_error "タスクの待機中にエラーが発生しました"

# タスクの結果を確認
for id in "${task_ids[@]}"; do
    echo -e "\e[36mタスク $id の結果:\e[0m"
    pueue log "$id" || echo -e "\e[31mタスク $id のログの取得に失敗しました\e[0m"
    echo ""
done

pueue shutdown

echo -e "\e[32mすべてのタスクが完了しました。\e[0m"