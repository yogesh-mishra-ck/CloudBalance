package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.service.CostExplorerService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class CostExplorerController {

    private final CostExplorerService costExplorerService;

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER','READ_ONLY')")
    @GetMapping("/get-cost")
    public ResponseEntity<?> getCost(
            @RequestParam(defaultValue = "SERVICE") String groupBy,
            @RequestParam(required = false) List<String> service,
            @RequestParam(required = false) List<String> instanceType,
            @RequestParam(required = false) List<String> accountId,
            @RequestParam(required = false) List<String> usageType,
            @RequestParam(required = false) List<String> platform,
            @RequestParam(required = false) List<String> region,
            @RequestParam(required = false) List<String> purchaseOption,
            @RequestParam(required = false) List<String> usageTypeGroup,
            @RequestParam(required = false) List<String> apiOperation,
            @RequestParam(required = false) List<String> resource,
            @RequestParam(required = false) List<String> availibilityZone,
            @RequestParam(required = false) List<String> tenancy,
            @RequestParam(required = false) List<String> legalEntity,
            @RequestParam(required = false) List<String> billingEntity,

            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate endDate
     ){

        System.out.println("In cost exp controller");
        return ResponseEntity.ok().body(costExplorerService.getCost(groupBy, service,instanceType,accountId,usageType,platform,region,purchaseOption,usageTypeGroup,apiOperation,resource,availibilityZone,tenancy,legalEntity,billingEntity,startDate,endDate));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER','READ_ONLY')")
    @GetMapping("/getAllFilters")
    public ResponseEntity<?> getAllFilters(@RequestParam String allFilterType){
        System.out.println("Filter chosen "+allFilterType);
        return ResponseEntity.ok().body(costExplorerService.getAllFilterType(allFilterType));
    }


}
