package com.nanuri.rams.com.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WFStepDTO {
    
    private String wfMapId;             //워크플로우 맵ID
    private String stepId;              //워크플로우 스텝ID
    private String nextStepId;          //다음스텝 ID
    private String rtnStepId;           //반송스텝 ID
    private String stepNm;              //스텝명
    private String wfAuthId;            //워크플로우 권한ID
    private String excAuthEmp;          //예외권한 사원번호
    private String excAuthDept;         //예외권한 부서코드

}
