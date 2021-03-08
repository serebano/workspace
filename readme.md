```

docker-compose up

## OR

docker run \
    --name wrksps \
    -it \
    -v /root/.coder-config/workspace:/app \
    -p 7733:7733 \
    workspace 

```