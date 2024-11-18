package com.nanuri.rams.business.common.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/*
 * 리포트정보 Table.RAB01B DTO
 * */
public class RAB01BDTO extends CommonDTO{
	
	
		private String repNo;				// 리포트번호
		private String relDocCcd;			// 관련문서구분코드
		private String repCcd;				// 리포트구분코드
		private String entpCd;				// 업체코드
		private String metTitNm;			// 미팅제목명
		private String metDt;				// 미팅일자
		private String invstGdsLdvdCd;		// 투자상품대분류코드
		private String invstGdsMdvdCd;		// 투자상품중분류코드
		private String metPrpsNm;			// 미틸목적명
		private String metCntnt;			// 미팅내용
		private String custNm;				// 고객명
		private String custChrgDeptNm;		// 고객담당부서명
		private String custPstnNm;			// 고객직급명
		private String custMainCrrCntnt;	// 고객주요경력내용
		private String custRefCntnt;		// 고객참고사항내용
		private String scrtArtcF;			// 비밀글여부
		private String chrgPEno;			// 담당사원번호
		private String chrgDprtCd;			// 담당부점코드
		private String ibDealNo;			// iBDEAL번호
		//private String corpNo;				// 법입먼호
		private String entpNm;				// 업체명
		//private String corpSclCd;			// 기업규모코드
		//private String indTypDvdCd;			// 업종분류코드
		//private String aflCmpNm;			// 계열명
		//private String crdtGrdCd;			// 신용등급코드
		//private String mktLstdCd;			// 상장시장토드
		//private int repFileAttSq;			// 리포트파일첨부일련번호
		//private String svFilePathNm;		// 서버파일경로명
		//private String svFileNm;			// 서버파일명
		//private String svFileExpnsnNm;		// 서버파일확장명
		//private int svFileSz;				// 서버파일크기
		//private String scrnMenuId;			// 화면메뉴ID
		//private String fileCntnt;			// 파일내용
		//private String orgFileNm;			// 원본파일멍
		//private String repDsgnUsrNo;		// 리포트지정사용자번호
		private String dprtCd;				// 부점코드
		//private String repDsgnDeptNo;		// 리포트지정부서번호
		//private int relRepSq;				// 관련리포트일련번호
		//private String rgstDt;				// 들록일자
		//private Date hndlDyTm;				// 처리일시
		//private String hndlDprtCd;			// 처리부점코드
		//private String hndlPEno;			// 처리자사번
		private String dltF;				// 삭제여부

}
