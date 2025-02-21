package com.nanuri.rams.business.assessment.tb90.tb9000;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS402BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS810BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.vo.IBIMS810BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.com.calculation.Calculation;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;
import com.nanuri.rams.com.dto.CalculationSumDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9000ServiceImpl implements TB9000Service {

    @Autowired
    private Calculation calculation;

    @Autowired
    private final IBIMS810BMapper ibims810bMapper;
    private final IBIMS997BMapper ibims997bMapper;
    private final IBIMS402BMapper ibims402bMapper;

    @Autowired
    private AuthenticationFacade facade;

    @Override
    public int insertIBIMS810B(IBIMS997BDTO param) {

        // |B027 |배치명령유형코드 |BATCH_CMD_DCD |1 |1 |Batch       |1 |Batch       |
        // |B027 |배치명령유형코드 |BATCH_CMD_DCD |1 |2 |Forced-OK   |2 |Forced-OK   |
        // |B027 |배치명령유형코드 |BATCH_CMD_DCD |1 |3 |(Re)Run     |3 |(Re)Run     |
        // |B027 |배치명령유형코드 |BATCH_CMD_DCD |1 |4 |Kill        |4 |Kill        |
        // |B027 |배치명령유형코드 |BATCH_CMD_DCD |1 |5 |Brake       |5 |Brake       |

        // |J002 |배치작업상태     |JOB_STATUS    |1 |1 |Not Running |1 |Not Running |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |2 |Waitting    |2 |Waitting    |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |3 |Running     |3 |Running     |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |4 |Complete    |4 |Complete    |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |5 |Error       |5 |Error       |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |6 |Terminate   |6 |Terminate   |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |7 |Terminated  |7 |Terminated  |
        // |J002 |배치작업상태     |JOB_STATUS    |1 |8 |Stop        |8 |Stop        |

        int result = 0;


        // UPDATE IBIMS997B
        //     SET CUR_DATE           = #{curDate}            /* 당일일자 */
        //       , JOB_ID             = #{jobId}              /* JOB ID */
        //       , JOB_NAME           = #{jobName}            /* JOB NAME */
        //       , OBJECT_NAME        = #{objectName}         /* SOURCE FULL NAME */
        //       , PRE_JOB_COUNT      = #{preJobCount}        /* 선행JOB건수 */
        //       , CHILD_PID          = #{childPid}           /* 프로그램 PID */
        //       , FIRST_START_TIME   = NVL(
        //                                     (
        //                                      SELECT NULLIF(FIRST_START_TIME, '')
        //                                        FROM IBIMS997B
        //                                       WHERE JOB_ID = #{jobId}
        //                                         AND CUR_DATE = #{curDate}
        //                                     ), TO_CHAR(SYSDATE, 'YYYYMMDDhh24mmss')
        //                                    )            /* 최초 시작시간 */
        //       , START_TIME         = NVL(TO_CHAR(SYSDATE, 'YYYYMMDDhh24mmss'), 
        //                                     (
        //                                      SELECT NULLIF(START_TIME, '')
        //                                        FROM IBIMS997B
        //                                       WHERE JOB_ID = #{jobId}
        //                                         AND CUR_DATE = #{curDate}
        //                                     )
        //                                    )                /* 시작시간 */
        //       , END_TIME           = NVL(#{endTime}, '') /* 종료시간 */
        //       , JOB_STATUS         = NVL(#{jobStatus}, 
        //                                     (
        //                                      SELECT JOB_STATUS
        //                                        FROM IBIMS997B
        //                                       WHERE JOB_ID = #{jobId}
        //                                         AND CUR_DATE = #{curDate}
        //                                     )
        //                                    )                /* 작업상태 */
        //       , HND_DETL_DTM       = SYSDATE                  /* 조작상세일시 */
        //       , HND_EMPNO          = #{hndEmpno}            /* 조작사원번호 */
        //       , HND_TMNL_NO        = #{hndTmnlNo}           /* 조작단말기번호 */
        //       , HND_TR_ID          = #{hndTrId}             /* 조작거래ID */
        //       , GUID               = #{guid}                /* GUID */
        //   WHERE 1=1
        //     AND CUR_DATE           = #{curDate}
        //     AND JOB_ID             = #{jobId}

        try {
            // 업무시작시간 업데이트
            param.setHndEmpno("BATCH");
            ibims997bMapper.updateIBIMS997B(param);

            // Batch업무시작
            IBIMS810BDTO ibims810bdto = new IBIMS810BDTO();

            ibims810bdto.setStdrDt(param.getCurDate());

            List<IBIMS810BDTO> select = ibims810bMapper.selectIBIMS810B(ibims810bdto);

            // 이자 계산 시물레이션
            // 태안씨가 만든 이자계산시뮬레이션 돌려야함
            CalculationDTO calcDto = new CalculationDTO();
            CalculationSumDTO calcSumDto = new CalculationSumDTO();
            for (int i = 0; i < select.size(); i++) {
                TB06015SVO inSvo = new TB06015SVO();

                String prdtCd = select.get(i).getPrdtCd();
                long excSn = select.get(i).getExcSn();
                String stdrDt = select.get(i).getStdrDt();

                inSvo.setPrdtCd(prdtCd);
                inSvo.setExcSn(excSn);
                inSvo.setStdrDt(stdrDt);

                List<CalculationResultDTO> outCalc = new ArrayList<>();
                outCalc = calculation.setIntrCalcSimulation(inSvo);
                TB06015SVO getDtlInf = ibims402bMapper.getDetailInfo(inSvo);
                String intrSnnoPrcsDcd = getDtlInf.getIntrSnnoPrcsDcd();
                calcDto.setIntrSnnoPrcsDcd(intrSnnoPrcsDcd);

                calcSumDto = calculation.totalCalculation(calcDto, outCalc);
                select.get(i).setNrmlIntr(calcSumDto.getTotalIntr()); // 정상이자합계
                select.get(i).setIntrAmtOvduIntr(calcSumDto.getTotalIntrOvduIntr()); // 이자연체이자 합계
            } // end of for

            IBIMS810BVO ibims810bvo = new IBIMS810BVO();

            ibims810bvo.setIbims810bdtoList(select);

            // 삭제
            ibims810bMapper.deleteIBIMS810B(param.getCurDate());

            // 입력
            if ( ibims810bvo.getIbims810bdtoList().size() > 0 ) {
                ibims810bMapper.insertIBIMS810B(ibims810bvo);
            }

            // 체크
            param.setJobStatus("4"); // complete
            ibims997bMapper.subPreJobCount(param);

            // 배치업데이트
            result = ibims997bMapper.batchUpdate(param);
        }
        // 실패시 error 업데이트
        catch (Exception e) {
            param.setJobStatus("5");
            result = ibims997bMapper.batchUpdate(param);
        }

        return result;
    }

}