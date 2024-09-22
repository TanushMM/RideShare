FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV JWT_SECRET_KEY=be293c5cfb8042972e3ba418064c9a7c
ENV OPENAI_API_KEY=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

EXPOSE 5050

CMD ["python", "app.py"]

