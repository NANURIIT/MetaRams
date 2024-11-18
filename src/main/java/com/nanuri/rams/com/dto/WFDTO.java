package com.nanuri.rams.com.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WFDTO {

    private String wfId;                //워크플로우ID
    private String wfMapId;             //워크플로우 맵ID
    private String wfStepId;            //워크플로우 스텝ID
    private String aprvEmpNo;           //결재자 사원번호
    private String aprvDttm;            //결재일시
    private String rtnYn;               //반송여부
    private String rtnCnts;             //반송사유
    private String excAuthCd;           //예외권한코드
    private String memoCnts;            //결재사유
    private String etc;                 //기타
    private String jobCnts;             //업무내역
    
}
