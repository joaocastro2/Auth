package com.example.auth.config;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * This class configures all the operation and priority of the flyway.
 */
@Configuration
public class FlywayMigrationConfig {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;

    @Value("${spring.datasource.username}")
    private String datasourceUser;

    @Value("${spring.datasource.password}")
    private String datasourcePassword;

    @Bean(initMethod = "migrate")
    public Flyway flyway() {
        Flyway flyway = Flyway.configure()
                .dataSource(datasourceUrl, datasourceUser, datasourcePassword)
                .locations("classpath:db/migration")
                .baselineOnMigrate(true)
                .load();
        return flyway;
    }
}