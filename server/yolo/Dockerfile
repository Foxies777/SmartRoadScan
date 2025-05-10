FROM python:3.11-slim

# Системные зависимости
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория
WORKDIR /app

# Копируем код и requirements
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Переменные окружения передаются из --env-file
CMD ["python", "detection.py"]
