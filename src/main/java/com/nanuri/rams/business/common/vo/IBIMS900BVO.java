package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.dto.IBIMS901BDTO;
import com.nanuri.rams.business.common.dto.IBIMS902BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IBIMS900BVO extends IBIMS900BDTO {

    private String fincExcuRqsDt1;
    private String fincExcuRqsDt2;
    private String decdSttsDcd;     // 결재상태구분코드
    private String decdStepDcd;     // 결재단계구분코드

    private String apvlRqstPEno;    // 요청자사번
    private Date rqstDtm;           // 신청일시
    private BigDecimal rndrInAmt;   // 입금합계
    private BigDecimal rndrOutAmt;  // 출금합계
    private String trDt;            // 거래일자
    private String fromDate;        // 거래일자
    private String toDate;          // 거래일자

    private List<IBIMS901BDTO> pblHisList;          // 유동화증권방행내역
    private List<IBIMS902BDTO> dpstRqstList;        // 입금요청내역
    private List<IBIMS902BDTO> wthdrwlRqstList;     // 출금요청내역
    
}
