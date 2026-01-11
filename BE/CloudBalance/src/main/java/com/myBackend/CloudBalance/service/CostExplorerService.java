package com.myBackend.CloudBalance.service;

import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface CostExplorerService {
    Object getCost(String groupBy, List<String> service, List<String> instanceType, List<String> accountId, List<String> usageType, List<String> platform, List<String> region, List<String> purchaseOption, List<String> usageTypeGroup, List<String> apiOperation, List<String> resource, List<String> availibilityZone, List<String> tenancy, List<String> legalEntity, List<String> billingEntity, LocalDate startDate, LocalDate endDate);

    List<String> getAllFilterType(String allFilterType);

//    public ResponseEntity<?> getCost();
}
