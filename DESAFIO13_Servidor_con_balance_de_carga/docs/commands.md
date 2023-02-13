# Comandos

## 1°

```
pm2 start app.js  --name="ServerFork" --watch -- 8081
```

```
pm2 start app.js  --name="ServerCluster" --watch -i max -- 8082
```

**Archivo de configuración en nginx/config1**

## 2°

```
pm2 start app.js  --name="ServerFork" --watch -- 8081
```

```
pm2 start app.js  --name="ServerFork2" --watch -- 8082
```

```
pm2 start app.js  --name="ServerFork3" --watch -- 8083
```

```
pm2 start app.js  --name="ServerFork4" --watch -- 8084
```

```
pm2 start app.js  --name="ServerFork5" --watch -- 8085
```

**Archivo de configuración en nginx/config2**
