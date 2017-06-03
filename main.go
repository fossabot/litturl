package main

import (
	"sync"

	"github.com/matmerr/litturl/server"
)

func main() {

	//go func() {
	server.Start()
	//}()

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
	}()
	wg.Wait()
}