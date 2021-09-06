

# Changes for stress load

```typescript
__gameLoop() {
    for(var i =0; i < 10000; i++) {
      this.stats.begin();

      this.__playNext();

      this.stats.end();
    }

    window.setTimeout(this.__gameLoop.bind(this), 0)
}
```