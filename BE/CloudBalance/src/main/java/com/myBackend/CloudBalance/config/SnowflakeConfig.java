package com.myBackend.CloudBalance.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class SnowflakeConfig {

    @Bean
    @Qualifier("snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate() {
        HikariDataSource ds = new HikariDataSource();
        ds.setDriverClassName("net.snowflake.client.jdbc.SnowflakeDriver");
        ds.setJdbcUrl("jdbc:snowflake://jgwazim-wu66490.snowflakecomputing.com?db=snowflake_learning_db&schema=AWS_CUR&warehouse=snowflake_learning_wh&role=cost_db_readonly&disableGcpCloudAuth=true&disableAwsCloudAuth=true&disableAzureCloudAuth=true");
        ds.setUsername("cost_read_user");
        ds.setPassword("aws_cost_report_read_only");
        ds.setMaximumPoolSize(10);
        ds.setPoolName("SnowflakeHikariPool");

        return new JdbcTemplate(ds);
    }
}
