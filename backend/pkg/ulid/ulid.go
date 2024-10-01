package ulid

import (
	"math/rand"
	"sync"
	"time"

	"github.com/oklog/ulid/v2"

	"kohaku/backend/pkg/errors"
)

var monotonic ulid.MonotonicReader

func init() {
	seed := time.Now().UnixMilli()
	entropy := rand.New(rand.NewSource(seed))
	monotonic = &monotonicRead{
		MonotonicReader: ulid.Monotonic(entropy, 0),
	}
}

// monotonicRead implements the MonotonicReader interface.
type monotonicRead struct {
	m sync.Mutex
	ulid.MonotonicReader
}

// safe for concurrent use.
func (r *monotonicRead) MonotonicRead(ms uint64, p []byte) error {
	r.m.Lock()
	defer r.m.Unlock()
	if err := r.MonotonicReader.MonotonicRead(ms, p); err != nil {
		return errors.Wrap(err)
	}
	return nil
}

func New() (ulid.ULID, error) {
	res, err := NewWithTime(time.Now())
	if err != nil {
		return ulid.ULID{}, errors.Wrap(err)
	}
	return res, nil
}

func NewWithTime(t time.Time) (ulid.ULID, error) {
	res, err := ulid.New(ulid.Timestamp(t), monotonic)
	if err != nil {
		return ulid.ULID{}, errors.Wrap(err)
	}
	return res, nil
}

func MustNew() ulid.ULID {
	id, err := New()
	if err != nil {
		panic(err)
	}
	return id
}

func Make() string {
	return MustNew().String()
}

func Valid(s string) error {
	if _, err := ulid.Parse(s); err != nil {
		return errors.Wrap(err)
	}
	return nil
}
