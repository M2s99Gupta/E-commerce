# Use an OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory in the container
WORKDIR /app

# Copy your compiled JAR file into the container
COPY target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
