package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 공통코드정보 Table.RAA91B DTO
 * */
public class RAA91BDTO extends CommonDTO{

    private String cmnsCdGrp;		// 공통코드그룹
    private String cdVlId;			// 코드값
    private String cdVlNm;			// 코드값명
    private String rsltCdVl; 		// 변환후코드ID
    private Integer cdSq;			// 코드일련번호
    private String useF;			// 사용여부
    private String dltF;			// 삭제여부
}
