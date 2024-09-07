package errors

type ErrorDetail struct {
	Code      string
	MessageJa string
}

func newErrorDetail(code, messageJa string) ErrorDetail {
	return ErrorDetail{
		Code:      code,
		MessageJa: messageJa,
	}
}

var (
	CardNotFound = newErrorDetail("card_not_found", "カードが見つかりませんでした")
)
