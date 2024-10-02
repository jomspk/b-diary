package slices_test

import (
	"reflect"
	"testing"

	"kohaku/backend/pkg/slices"
)

func TestMap(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		in   []string
		out  []int
		f    func(f string) int
	}{
		{"nil", nil, []int{}, nil},
		{"empty", []string{}, []int{}, func(f string) int { return 0 }},
		{"length", []string{"", "1", "11", "111"}, []int{0, 1, 2, 3}, func(f string) int { return len(f) }},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			var out []int = slices.Map(tt.in, tt.f)
			if !reflect.DeepEqual(out, tt.out) {
				t.Errorf("TestMap() = %+v, want %+v", out, tt.out)
			}
		})
	}
}
