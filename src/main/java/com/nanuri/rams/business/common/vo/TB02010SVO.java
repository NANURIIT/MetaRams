package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TB02010SVO {
    private List<WorkFlowDTO> workFlowList;         //워크플로우 리스트
    private List<WorkFlowDTO> wfCntList;            //워크플로우 건수 리스트 
}
