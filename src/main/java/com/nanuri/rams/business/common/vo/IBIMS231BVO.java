package com.nanuri.rams.business.common.vo;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
딜승인결재기본 Table.IBIMS224B VO
*/
public class IBIMS231BVO extends IBIMS231BDTO {
	
	private String dealNm;		    // 딜명
    private String chrrNm;          // 책임자명
    private String apvlRqstPNm;     // 승인요청자명
    
    // TB06082P에서 사용할 IBIMS232B 내용
    private String dcfcAnnoCntn;    // 결재자주석내용
    private String rjctRsnCntn;     // 반려사유내용

    private List<IBIMS231BDTO> apvlList;

}
