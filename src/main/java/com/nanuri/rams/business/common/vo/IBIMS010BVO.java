package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS010BDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * 기업체 정보 처리 Table.IBIMS010B VO
 * */
public class IBIMS010BVO {
    
	@Getter
	@Setter
	@ToString
	public static class SchCondVO {
		private String ardyBzepNo; /* 기업체번호 */
		private String entpNm; /* 업체명 */
		private String rnbn; /* 주민사업자등록번호 */
		private String crno; /* 법인등록번호 */
		private String csno; /* 고객번호 */
		private String useYn; /* 사용여부 */
		private String clseDt; /* 폐업일자 */
		private String rgstDt; /* 등록일자 */
		private String stdIdstSclsCd; /* 표준산업소분류코드 */
		private String clseDvsnCd; /* 폐업구분코드 */			
	}
	
	@Getter
	@Setter
	public static class ArdyBzepVO extends IBIMS010BDTO {
		
		private String btnProcCd;	/* 기업체번호 존재유무 우선, D:삭제*/
		
		private String stdIdstSclsNm;	/* 표준산업소분류명 */
		private String clseDvsnNm;		/* 폐업구분명 */
		private String ovrsSpcYn;		/* 해외 SPC여부 */
			
	}

	@Getter
	@Setter
	public static class ArdyBzepListVO extends IBIMS010BDTO {
		
		private List<ArdyBzepVO> ardyBzepListVO;	/* 기업체번호 존재유무 우선, D:삭제*/

		private String ardyBzepNo; /* 기업체번호 */
		private String entpNm; /* 업체명 */
		private String rnbn; /* 주민사업자등록번호 */
		private String crno; /* 법인등록번호 */
		private String csno; /* 고객번호 */
		private String useYn; /* 사용여부 */
		private String clseDt; /* 폐업일자 */
		private String rgstDt; /* 등록일자 */
		private String stdIdstSclsCd; /* 표준산업소분류코드 */
		private String clseDvsnCd; /* 폐업구분코드 */
	}

	@Getter
	@Setter
	public static class ArdyBzepCdVO{
		private String cdVlNm;		/* 코드값명 */
		private String cdVlId;		/* 코드값ID */
		private String cmnsCdGrp;	/* 공통코드그룹 */
	}
}
