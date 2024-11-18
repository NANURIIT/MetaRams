package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS604BVO {

	@Getter
	@Setter
	public static class SearchVO{
		private String stdrDt;							// 기준일자
		private String empno;							// 사원번호
		private String inspctDprtDcd;					// 심사부서구분코드
		private String checked;							// 확인완료포함
	}

	@Getter
	@Setter
	public static class DealInfo{
		private String stdrDt;							// 기준일자
		private String entpNm;							// 기업명
		private String rprstPHnglNm;					// 대표자한글명
		private String corpRgstNo;						// 법인등록번호
		private String crdtAcdntOcrncDtls;
		private String dealNo;							// DEAL번호
		private String jdgmDcd;							// 심사구분코드
		private String mtrDcd;							// 부수안건구분코드
		private String mtrNm;							// 안건명
		private String inspctDprtDcd;					// 심사부서구분코드
		private String inspctDprtDcdNm;					// 심사부서구분명
		private String ownPEno;							
		private String empNm;
		private String fstCnfrDt;						// 최초확인일자
		private String ansAcptDt;						// 답변접수일자
		private String ivtgRsltCtns;					// 검토결과내용
	}

	@Getter
	@Setter
	public static class ExmntInfo{
		private String stdrDt;							// 기준일자
		private String dealNo;							// DEAL번호
		private String ivtgRsltCtns;					// 검토결과내용
		private String jdgmDcd;							// 심사구분코드
		private String mtrDcd;							// 부수안건구분코드
	    private Date   hndDetlDtm;                      // 조작상세일시
	    private String hndEmpno;                        // 조작사원번호
	    private String hndTmnlNo;                       // 조작단말기번호
	    private String hndTrId;                         // 조작거래id
	    private String guid;                            // guid
	}


}
