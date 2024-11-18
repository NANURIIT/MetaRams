package com.nanuri.rams.com.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WFMapDTO {
    
    private String wfMapId;             //워크플로우 맵ID
    private String wfMapNm;             //워크플로우 맵명
    private String jobTable;            //작업테이블명
    private String jobTableKey;         //작업테이블 KEY
    private String regDttm;             //등록일시
    private String regUserId;           //등록자
    private String chgDttm;             //변경일시
    private String chgUserId;           //변경자
    
}
