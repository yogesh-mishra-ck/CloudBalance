package com.myBackend.CloudBalance.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
//@RequiredArgsConstructor
public class SnowflakeRepository {

    @Autowired
    @Qualifier("snowflakeJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

//    public List<Map<String, Object>> getCost() {
//        String sql = """
//            SELECT *
//            FROM COSTREPORT
//            WHERE ID IN (1, 2, 3)
//        """;
//
//        return jdbcTemplate.queryForList(sql);
//    }
    public List<Map<String, Object>> getCostDefault() {
        String sql = """
            SELECT
            SERVICE,
            SUM(COST) AS TOTAL_COST
            LOWER(TO_CHAR(BILL_DATE, 'MMyyyy')) AS MONTH_KEY
            FROM COSTREPORT
            GROUP BY SERVICE, MONTH_KEY
        """;

        return jdbcTemplate.queryForList(sql);
    }

//    public List<String> getDistinctDataWithType(String type){
//
//    }
}
