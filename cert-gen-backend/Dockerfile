FROM openjdk:17-slim as build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn

COPY pom.xml .
COPY src ./src

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]