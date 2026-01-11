package com.myBackend.CloudBalance.service.impl;

import com.myBackend.CloudBalance.repository.SnowflakeRepository;
import com.myBackend.CloudBalance.service.CostExplorerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CostExplorerServiceImpl implements CostExplorerService {

    private final NamedParameterJdbcTemplate snowflakeJdbcTemplate;
    private final SnowflakeRepository snowflakeRepository;

    public CostExplorerServiceImpl(@Qualifier("snowflakeJdbcTemplate") JdbcTemplate snowflakeJdbcTemplate, SnowflakeRepository snowflakeRepository){
        this.snowflakeJdbcTemplate = new NamedParameterJdbcTemplate(snowflakeJdbcTemplate);
        this.snowflakeRepository = snowflakeRepository;
    }

    public void setFilterValues(String type, List<String> typeList, Map<String,Object> parameters,StringBuilder queryBuilder){

        if(typeList==null || typeList.isEmpty())
            return;
        type = (type == null || type.isEmpty()) ? "SERVICE" : type;
        String key = type.toLowerCase()+"List";
        queryBuilder.append(" AND ").append(type).append(" IN (:").append(key).append(") ");

//        queryBuilder.append(" AND "+type+" IN (:"+typeList+") ");
        parameters.put(key, typeList);
    }

    @Override
    public List<Map<String,Object>> getCost(String groupBy,
                             List<String> service,
                             List<String> instanceType,
                             List<String> accountId,
                             List<String> usageType,
                             List<String> platform,
                             List<String> region,
                             List<String> purchaseOption,
                             List<String> usageTypeGroup,
                             List<String> apiOperation,
                             List<String> resource,
                             List<String> availibilityZone,
                             List<String> tenancy,
                             List<String> legalEntity,
                             List<String> billingEntity,
                             LocalDate startDate, LocalDate endDate) {

        groupBy = (groupBy == null || groupBy.isEmpty()) ? "SERVICE" : groupBy;

        StringBuilder queryBuilder = new StringBuilder(
                "SELECT "+groupBy+" AS TYPE"+
                        ", SUM(COST) AS TOTAL_COST, "+
                        "LOWER(TO_VARCHAR(BILL_DATE, 'YYYY-MM')) AS MONTH "+
                        "FROM COSTREPORT " +
                        "WHERE 1=1 "
        );

        Map<String, Object> parameters = new HashMap<>();

        setFilterValues("SERVICE", service ,parameters,queryBuilder);
        setFilterValues("INSTANCE_TYPE", instanceType ,parameters,queryBuilder);
        setFilterValues("ACCOUNT_ID", accountId ,parameters,queryBuilder);
        setFilterValues("USAGE_TYPE", usageType ,parameters,queryBuilder);
        setFilterValues("PLATFORM", platform ,parameters,queryBuilder);
        setFilterValues("REGION", region ,parameters,queryBuilder);
        setFilterValues("PURCHASE_OPTION", purchaseOption ,parameters,queryBuilder);
        setFilterValues("USAGE_TYPE_GROUP", usageTypeGroup ,parameters,queryBuilder);
        setFilterValues("API_OPERATION", apiOperation ,parameters,queryBuilder);
        setFilterValues("RESOURCE", resource ,parameters,queryBuilder);
        setFilterValues("AVAILABILITY_ZONE", availibilityZone ,parameters,queryBuilder);
        setFilterValues("TENANCY", tenancy ,parameters,queryBuilder);
        setFilterValues("LEGAL_ENTITY", legalEntity ,parameters,queryBuilder);
        setFilterValues("BILLING_ENTITY", billingEntity ,parameters,queryBuilder);

//        if(service!=null && !service.isEmpty()){
//            queryBuilder.append("AND SERVICE IN (:serviceList) ");
//            parameters.put("serviceList", service);
//        }

        if(startDate!=null){
            queryBuilder.append("AND BILL_DATE >= :startDate ");
            parameters.put("startDate", startDate);
        }
        if(endDate!=null){
            queryBuilder.append("AND BILL_DATE < :endDate");
            parameters.put("endDate", endDate);
        }

        queryBuilder.append("GROUP BY ").append(groupBy).append(" ,MONTH");
//        +groupBy+", MONTH");
        String sql = queryBuilder.toString();
        List<Map<String,Object>> ans = snowflakeJdbcTemplate.queryForList(sql, parameters);
        System.out.println(ans);
        return ans;
    }

    @Override
    public List<String> getAllFilterType(String allFilterType) {

        String sql = "SELECT DISTINCT "+allFilterType+" FROM COSTREPORT WHERE "+allFilterType+" IS NOT NULL ORDER BY "+allFilterType+" ASC";
        return snowflakeJdbcTemplate.getJdbcOperations().queryForList(sql, String.class);
    }


}
