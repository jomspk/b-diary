package slices_test

import (
	"reflect"
	"testing"

	"kohaku/backend/pkg/slices"
)

func TestToMap(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		in   []string
		out  map[string]int
		f    func(f string) (key string, value int)
	}{
		{"nil", nil, map[string]int{}, nil},
		{"empty", []string{}, map[string]int{}, func(f string) (string, int) { return f, len(f) }},
		{"map_length", []string{"one", "four", "two"}, map[string]int{
			"one": 3, "four": 4, "two": 3,
		}, func(f string) (string, int) { return f, len(f) }},
	}
	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			var out map[string]int = slices.ToMap(tt.in, tt.f)
			if !reflect.DeepEqual(out, tt.out) {
				t.Errorf("TestFilter() = %+v, want %+v", out, tt.out)
			}
		})
	}
}

func TestToMapOfSlice(t *testing.T) {
	type child struct {
		ParentID string
		Value    int
	}
	tests := []struct {
		name string
		in   []child
		out  map[string][]int
		f    func(s child) (key string, value int)
	}{
		{"nil", nil, map[string][]int{}, nil},
		{"empty", []child{}, map[string][]int{}, func(s child) (string, int) { return s.ParentID, s.Value }},
		{"child_model", []child{
			{ParentID: "a", Value: 1},
			{ParentID: "b", Value: 2},
			{ParentID: "c", Value: 3},
			{ParentID: "a", Value: 4},
		}, map[string][]int{
			"a": {1, 4},
			"b": {2},
			"c": {3},
		}, func(s child) (string, int) { return s.ParentID, s.Value }},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var out map[string][]int = slices.ToMapOfSlice(tt.in, tt.f)
			if !reflect.DeepEqual(out, tt.out) {
				t.Errorf("TestFilter() = %+v, want %+v", out, tt.out)
			}
		})
	}
}
