package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.business.common.dto.IBIMS981BDTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS981BVO extends IBIMS981BDTO {

    private int rownum;
    private String actsCd;                     //  계정과목코드
    private String dudtMngmDtldJobKndCd;       //  업무종류코드
    private String dealNm;                     //  딜명
    private String ardyBzepNo;                 // 기업체번호
    //private String bzep_name;                
    private String prevDate;
    private String nextDate;
    private String trOthrDscmNo;               //  거래상대방식별번호
    private String cdVlNm; //부서명
    private String entpNm;                     // 기업체이름
}
