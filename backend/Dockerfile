FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the requirements
RUN pip install -r requirements.txt

# Copy the Django app code
COPY . .

# Run the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]