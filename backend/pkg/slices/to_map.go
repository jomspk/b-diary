package slices

// ToMap converts slice array into map[k]v.
func ToMap[In any, OutK comparable, OutV any](in []In, f func(In) (OutK, OutV)) map[OutK]OutV {
	out := map[OutK]OutV{}
	for _, v := range in {
		outk, outv := f(v)
		out[outk] = outv
	}
	return out
}

// ToMapOfSlice converts slice array into map[k][]v.
func ToMapOfSlice[In any, OutK comparable, OutV any](in []In, f func(In) (OutK, OutV)) map[OutK][]OutV {
	out := map[OutK][]OutV{}
	for _, v := range in {
		outk, outv := f(v)
		out[outk] = append(out[outk], outv)
	}
	return out
}
