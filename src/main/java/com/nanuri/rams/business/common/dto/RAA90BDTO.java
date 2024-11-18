package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 * 공통코드그룹정보 Table.RAA90B DTO
 * */
public class RAA90BDTO extends CommonDTO {

    private String cmnsCdGrp;		// 공통코드그룹
    private String cmnsCdNm;		// 공통코드명
    private String cmnsCdClsf;		// 공통코드구분
    private String cdLngth;			// 코드길이
    private String trnsfrmAftCdGrp;	// ?
    private String cmnsCdGrpExpl;	// 공통코드그룹설명
    private String useF;			// 사용여부
    private String dltF;			// 삭제여부
    private String hndlPEno;		// 처리자 사번
    
}
