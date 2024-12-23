package com.nanuri.rams.business.assessment.tb07.tb07090;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.dto.IBIMS435BDTO;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS430BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS435BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS992BMapper;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;
import com.nanuri.rams.business.common.vo.IBIMS435BVO;
import com.nanuri.rams.business.common.vo.TB07090SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07090ServiceImpl implements TB07090Service {
    
	private final AuthenticationFacade facade;

    /* 상환예정내역 */
    private final IBIMS403BMapper ibims403bMapper;

    /* 부서별입금내역 */
    private final IBIMS430BMapper ibims430bMapper;

    /* 입금내역매핑 */
    private final IBIMS435BMapper ibims435BMapper;

    /* 금융기관정보 */
    private final IBIMS992BMapper ibims992bMapper;

    @Override
    public TB07090SVO getDprtDtlsInfo(IBIMS430BVO param){

        log.debug("param check <TB07090ServiceImpl>");
        log.debug("param.rctmDt::: "       + param.getRctmDt());
        //log.debug("param.paiRdmpDcd::: "   + param.getPaiRdmpDcd());
        log.debug("param.dealNo::: "       + param.getDealNo());
        log.debug("param.dprtCd::: "       + param.getDprtCd());
        log.debug("param.fromDt::: "       + param.getFromDt());
        log.debug("param.toDt::: "         + param.getToDt());

        TB07090SVO rsltVO = new TB07090SVO();

        // 상환예정내역 조회
        List<IBIMS403BVO> rdmpPrarDtlsList = ibims403bMapper.getRdmpPrarDtls(param);
        // 입금내역등록증 조회
        List<IBIMS435BDTO> rctmDtlsList = ibims435BMapper.inqIBIMS435B(param.getRctmDt());
        // 입금내역매핑 조회
        List<IBIMS430BVO> dprtDtlsList = ibims430bMapper.getYesDealList(param);

        // 상황예정내역
        rsltVO.setRdmpPrarDtlsList(rdmpPrarDtlsList);
        // 입금증등록내역
        rsltVO.setRctmDtlsList(rctmDtlsList);
        // 입금내역매핑
        rsltVO.setDprtDtlsList(dprtDtlsList);

        return rsltVO;
    }

    // 입금증등록내역 저장
    @Override
    public int rctmDtlsRgst(IBIMS435BVO param){
        
        // log.debug("paramList(Before Sequence Setting):::{}", paramList);

        // int returnVal = 0;

        // for(int i=0; i < paramList.size(); i++){
        //     IBIMS430BDTO param = paramList.get(i);
        //     // IBIMS430BDTO keySrchParam = new IBIMS430BDTO();

        //     String rctmDt = param.getRctmDt();
        //     String rgstDtm = param.getRgstDtm();

        //     //입금순번 구하기
        //     int rctmSeq = ibims430bMapper.getNxtRctmSeq(rctmDt);
        //     param.setRctmSeq(rctmSeq);

        //     //등록순번 구하기
        //     int rgstSeq = ibims430bMapper.getNxtRgstSeq(rgstDtm);
        //     param.setRgstSeq(rgstSeq);

        //     param.setHndEmpno(facade.getDetails().getEno());
            
        //     returnVal = rgstSeq;
        // }

        // log.debug("paramList(After Sequence Setting):::{}", paramList);

        // int result = ibims430bMapper.rctmDtlsRgst(paramList);

        // return returnVal;

        int result = 0;

        List<IBIMS435BDTO> insertList = param.getInsertList();
        List<IBIMS435BDTO> updateList = param.getUpdateList();
        List<IBIMS435BDTO> deleteList = param.getDeleteList();

        // 입력
        for(int i = 0; i < insertList.size(); i++){
            // 입금순번 채번
            insertList.get(i).setRgstSeq(
                ibims435BMapper.getRgstSeq(
                    insertList.get(i).getRctmDt()
                )
            );
            // 조작사원번호
            insertList.get(i).setHndEmpno(facade.getDetails().getEno());

            ibims435BMapper.insertIBIMS435B(insertList.get(i));

            result =+ 1;
        }

        // 수정
        for(int i = 0; i < updateList.size(); i++){
            ibims435BMapper.insertIBIMS435B(updateList.get(i));
            result =+ 1;
        }

        // 삭제
        for(int i = 0; i < deleteList.size(); i++){
            ibims435BMapper.insertIBIMS435B(deleteList.get(i));
            result =+ 1;
        }

        return result;
    }

    // 입금내역매핑
    // @Override
    // public int rctmDtlsMapping(IBIMS430BVO param){
    //     int result = 0;

    //     List<IBIMS430BDTO> insertList = param.getInsertList();
    //     List<IBIMS430BDTO> updateList = param.getUpdateList();
    //     List<IBIMS430BDTO> deleteList = param.getDeleteList();

    //     // 입력
    //     for(int i = 0; i < insertList.size(); i++){
    //         // 등록순번 채번
    //         insertList.get(i).setRgstSeq(
    //             ibims430bMapper.getRgstSeq(
    //                 insertList.get(i).getRctmDt()
    //             )
    //         );
    //         // 조작사원번호
    //         insertList.get(i).setHndEmpno(facade.getDetails().getEno());

    //         ibims430bMapper.insertIBIMS435B(insertList.get(i));

    //         result =+ 1;
    //     }

    //     // 수정
    //     for(int i = 0; i < updateList.size(); i++){
    //         ibims430bMapper.insertIBIMS435B(updateList.get(i));
    //         result =+ 1;
    //     }

    //     // 삭제
    //     for(int i = 0; i < deleteList.size(); i++){
    //         ibims430bMapper.insertIBIMS435B(deleteList.get(i));
    //         result =+ 1;
    //     }

    //     return result;
    // }

}
