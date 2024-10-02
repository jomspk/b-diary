package slices_test

import (
	"reflect"
	"testing"

	"kohaku/backend/pkg/slices"
)

func TestFilter(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		in   []string
		out  []string
		f    func(f string) bool
	}{
		{"nil", nil, []string{}, nil},
		{"empty", []string{}, []string{}, func(f string) bool { return true }},
		{"remove_empty", []string{"", "1", "", "11", "", "111", ""}, []string{"1", "11", "111"}, func(f string) bool { return f != "" }},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			var out []string = slices.Filter(tt.in, tt.f)
			if !reflect.DeepEqual(out, tt.out) {
				t.Errorf("TestFilter() = %+v, want %+v", out, tt.out)
			}
		})
	}
}
