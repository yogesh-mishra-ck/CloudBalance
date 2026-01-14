package com.myBackend.CloudBalance.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.datasource.driver-class-name}")
    private String driverName;

    @Value("${snowflake.datasource.jdbc-url}")
    private String jdbcurl;

    @Value("${snowflake.datasource.username}")
    private String username;

    @Value("${snowflake.datasource.password}")
    private String password;

    @Value("${snowflake.datasource.maximum-pool-size}")
    private Integer poolSize;

    @Value("${snowflake.datasource.pool-name}")
    private String poolName;

    @Bean
    @Qualifier("snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate() {
        System.out.println("avcvccf"+poolName +poolSize+password+username+jdbcurl+driverName);

        HikariDataSource ds = new HikariDataSource();
//        ds.setDriverClassName("net.snowflake.client.jdbc.SnowflakeDriver");
//        ds.setJdbcUrl("jdbc:snowflake://jgwazim-wu66490.snowflakecomputing.com?db=snowflake_learning_db&schema=AWS_CUR&warehouse=snowflake_learning_wh&role=cost_db_readonly&disableGcpCloudAuth=true&disableAwsCloudAuth=true&disableAzureCloudAuth=true");
//        ds.setUsername("cost_read_user");
//        ds.setPassword("aws_cost_report_read_only");
//        ds.setMaximumPoolSize(10);
//        ds.setPoolName("SnowflakeHikariPool");

        ds.setDriverClassName(driverName);
        ds.setJdbcUrl(jdbcurl);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setMaximumPoolSize(poolSize);
        ds.setPoolName(poolName);

        return new JdbcTemplate(ds);
    }
}
