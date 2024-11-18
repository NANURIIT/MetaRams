package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AS05010SVO {
	// 안건 진행정보관리
	private String ibDealNo;			// IBDEAL번호
	private String ibDealNm;			// 안건명
	private String riskInspctCcd;		// 리스크심사구분코드
	private String riskInspctCcdNm;		// 신규/재부의명
	private String lstCCaseCcd;			// 부수안건구분코드
	private String lstCCaseCcdNm;		// 부수안건명
	private String ownpEno;				// 심사역
	private String ownpEnoNm;			// 심사역이름
	
	private Date   hndlDyTm;			// 처리일시
	private String hndlDprtCd;			// 처리부점코드
	private String hndlPEno;			// 처리자사번
	
	// 약정/기표/철회 
	private String agrDt;				// 약정일자
	private String agrAmt;				// 약정금액
	private String rqsDocNo;			// 요청문서번호
	private String raDocCcd;			// RA문서구분코드
	private String raDocNo;				// RA문서번호
	private String caseRaDocNo;			// CASE RA문서번호
	private String caseRaDocCcd;		// CASE RA문서구분코드
	private int	   itemSq;				// 항목일련번호
	private int	   caseItemSq;			// 약정 항목일련번호
	private String wrtDt;				// 기표일자
	private String mtrtDt;				// 만기일자
	private String cshNtrAstsWrtAmt;	// 현금성자산기표금액	
	private String inspctCnclHndlCcd;	// 심사취소처리구분코드
	private String inspctCnclHndlCcdNm;	// 심사취소처리구분코드명
	private String nhndlRsnCntnt;		// 미처리사유내용
	private String inspctPrgrsStCd;		// 심사진행상태코드
	private String inspctPrgrsStCdNm;	// 심사진행상태코드명
	
	// EXIT
	private String endDt;				// 종료일자 / EXIT 날짜
	private String optnlEndCcd;			// 임의종료구분코드
	private int    exitItemSq;			// EXIT 항목일련번호
	private String exitRaDocNo;			// EXIT RA문서번호
	private String exitRaDocCcd;		// EXIT RA문서구분코드
	private String endBssCntnt;			// 종료기본내용

}
