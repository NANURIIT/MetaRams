package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 메뉴별권한화면사용권한설정 Table.IBIMS007B DTO
*/
public class IBIMS010BDTO {
	private String ardyBzepNo; /* 기업체번호 */
	private String bzepName; /* 업체명 */
	private String rnbn; /* 주민사업자등록번호 */
	private String crno; /* 법인등록번호 */
	private String csno; /* 고객번호 */
	private String niceiBzepCd; /* 나이스신용평가업체코드 */
	private String bzplDvsnCd; /* 사업장구분코드 */
	private String korBzplName; /* 한글사업장명 */
	private String engBzplName; /* 영문사업장명 */
	private String atno; /* 전화지역번호 */
	private String btno; /* 전화국번호 */
	private String stno; /* 전화일련번호 */
	private String faxAtno; /* 팩스전화지역번호 */
	private String faxBtno; /* 팩스전화국번호 */
	private String faxStno; /* 팩스전화일련번호 */
	private String zpcd; /* 우편번호 */
	private String korBzplAddr; /* 한글사업장주소 */
	private String engBzplAddr; /* 영문사업장주소 */
	private String opbsDt; /* 개업일자 */
	private String stdIdstSclsCd; /* 표준산업소분류코드 */
	private String bucoName; /* 업태명 */
	private String clseDvsnCd; /* 폐업구분코드 */
	private String clseDt; /* 폐업일자 */
	private String erlmDt; /* 등록일자 */
	private String rdmTrOppnNo; /* RDM거래상대방번호 */
	private String smetYn; /* 중소기업여부 */
	private String etprShapDvsnCd; /* 기업형태구분코드 */
	private String leiCd; /* LEI코드 */
	private String ctmBicName; /* CTM은행인식코드명 */
	private String swiftBankDscmCd; /* SWIFT은행식별코드 */
	private String etprScleDvsnCd; /* 기업규모구분코드 */
	private BigDecimal rvnuAmt; /* 매출금액 */
	private BigDecimal totAsstAmt; /* 총자산금액 */
	private BigDecimal fnafHltySrnmRt; /* 재무건전성비율 */
	private String ovrsSpcYn; /* 해외SPC여부 */
	private String useYn; /* 사용여부 */
	
	private Date hndDetlDtm; /* 조작상세일시 */
	private String hndEmpno; /* 조작사원번호 */
	private String hndTmnlNo; /* 조작단말기번호 */
	private String hndTrId; /* 조작거래ID */
	private String guid; /* GUID */
	
	private String estDt;		/* 설립일자 */
	private int    stffNum;		/* 직원수 */
	private int    oprtHnfNum;	/* 운영인력수 */
}