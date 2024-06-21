# Use Maven 3.8.1 and OpenJDK 17 for the build stage
FROM maven:3.8.1-openjdk-17 as build
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use OpenJDK 17 for the runtime stage
FROM openjdk:17
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
