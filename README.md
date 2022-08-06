```
PATH_TO_FILE=
SECRET_API_KEY=
TIMESTAMP=`date "+%s"`
FOLDER="image-upload-app"

echo -n "folder=${FOLDER}&timestamp=${TIMESTAMP}${SECRET_API_KEY}" | shasum -a 1

curl 'https://api.cloudinary.com/v1_1/di10z2qjt/image/upload' -X POST -F "file=@/${PATH_TO_FILE}" -F 'api_key=142921572737282' -F "folder=${FOLDER}" -F "timestamp=${TIMESTAMP}" -F 'signature='
```
