package com.nanuri.rams.business.assessment.gd11;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS001BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS002BMapper;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import com.nanuri.rams.business.common.vo.GD11000SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor

public class GD11000ServiceImpl implements GD11000Service {

    // Mapper쓰기 위해 선언
    private final IBIMS001BMapper ibims001BMapper;
    private final IBIMS002BMapper ibims002BMapper;

    @Override
    public List<IBIMS001BVO> getCommonCodeName() {
        return ibims001BMapper.getCommonCodeName();
    }

    // // 그룹코드 조회
    // @Override
    // public List<IBIMS001BDTO> getGrpCdInfo(IBIMS001BDTO paramData) {

    // log.debug("[getGrpCdInfo] paramData.cmnsCdGrp ::: " +
    // paramData.getCmnsCdGrp());
    // log.debug("[getGrpCdInfo] paramData.cmnsCdGrpExpl ::: " +
    // paramData.getCmnsCdGrpExpl());

    // // GD110000SVO aRslt = a(paramData);

    // // List<IBIMS001BDTO> aDtoList = aRslt.getDtoList();
    // // List<IBIMS002BVO> aAddDtoList = aRslt.getAddDtoList();

    // // log.debug("[getGrpCdInfo] aDtoList::: {}", aDtoList);
    // // log.debug("[getGrpCdInfo] aAddDtoList::: {}" , aAddDtoList);

    // List<IBIMS001BDTO> dtoList = ibims001BMapper.getGrpCdInfo(paramData);

    // return dtoList;
    // }

    // // 추가코드 조회
    // @Override
    // public List<IBIMS002BVO> getAddCdInfo(IBIMS001BDTO paramData) {

    // // console 찍기!!!
    // log.debug("왓나?");
    // // log.debug("[GD11000S_getAddCdInfo] paramData.getAddCodeInfoList ::: " +
    // paramData.());

    // List<IBIMS002BVO> addDtoList = ibims002BMapper.getAddCdInfo(paramData);
    // return addDtoList;
    // }
    

    // 계산기
    @Override
    public int listCalculator() {

        int frstRslt = frstExam();
        int scndRslt = scndExam();

        return frstRslt + scndRslt;

    }

    public int frstExam(){

        int [] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int result = 0;

        
        for (int i = 0; i < numbers.length; i++) {
            //result += numbers[i];
            result += numbers[i];
        }
         
        log.debug("[listCalculator]result ::: "+ result);
        return result; 
    }

    public int scndExam(){
        int result = 0;

        HashMap<String, Integer> numbers = new HashMap<>();
        for (int i = 1; i <= 10; i++) {
            numbers.put("number" + i, i);
            // result += numbers.get()
        }

        log.debug("numbers ::: " + numbers);
        return result;
    }

    // ajax 한번에 태워서 통합조회
    @Override
    public GD11000SVO getCodeInfo(IBIMS001BDTO paramData) {

        log.debug("[getCodeInfo] paramData.cmnsCdGrp ::: " + paramData.getCmnsCdGrp());
        log.debug("[getCodeInfo] paramData.cmnsCdGrpExpl ::: " + paramData.getCmnsCdGrpExpl());

        GD11000SVO gd11000svo = new GD11000SVO();

        // grpList, addList에다가 각 Mapper에서 받아온 값들 넣어주고
        List<IBIMS001BDTO> grpList = ibims001BMapper.getGrpCdInfo(paramData);
        List<IBIMS002BVO> addList = ibims002BMapper.getAddCdInfo(paramData);

        // gd11000svo에다 grpList,addList 데이터들 넣어주고
        gd11000svo.setGrpList(grpList);
        gd11000svo.setAddList(addList);

        // 위에서 만든 gd11000svo가 return되야되는거 아닌가?
        return gd11000svo;

    }

    @Override
    public int saveCodeInfo(GD11000SVO param) {
        // log.debug("param ::: "+ param.getCmnsCdGrp());
        // log.debug("param size ::: "+ param.getAddList().size());

        /**
         * rslt
         * 0 :: 오류
         * 1 :: 업데이트할 행 없음
         * 2 :: 업데이트할 행 있고 오류 없음
         */
        int rslt = 1;

        String cmnsCdGrp = param.getCmnsCdGrp();
        String cmnsCdGrpExpl = param.getCmnsCdGrpExpl();

        // /*parameter setting start*/
        IBIMS001BDTO ibims001bdto = new IBIMS001BDTO(); // getAddCdInfo 함수를 돌리기 위한 파라미터
        ibims001bdto.setCmnsCdGrp(cmnsCdGrp); // 코드구분 세팅
        ibims001bdto.setCmnsCdGrpExpl(cmnsCdGrpExpl); // 코드설명 세팅

        log.debug("cmnsCdGrp ::: " + cmnsCdGrp);
        log.debug("cmnsCdGrpExpl ::: " + cmnsCdGrpExpl);

        /* parameter setting end */

        List<IBIMS002BVO> updtList = param.getAddList();
        // IBIMS002BDTO updtInfo = new IBIMS002BDTO();
        for (int i = 0; i < updtList.size(); i++) {
            // updtList.get(0).getCdVlId();
            IBIMS002BDTO ibims002bdto = new IBIMS002BDTO();
            // ibims002bdto.getCdVlId();
            // updtInfo.setCmnsCdGrp(param.getCmnsCdGrp());
            // updtInfo.setCdVlId(param.getAddList());
            // updtInfo.setCdVlNm(param.getAddList());

        }

        List<IBIMS002BVO> scrnList = param.getAddList(); // 화면에서 받은 그리드 (변경점이 있을수도 없을수도 있음)
        List<IBIMS002BVO> dbList = ibims002BMapper.getAddCdInfo(ibims001bdto); // DB에서 쿼리로 조회한 기존 데이터

        if (scrnList.size() == 0) {
            rslt = 0;
            return rslt;
        }

        log.debug("scrnList.size::: " + scrnList.size());
        log.debug("dbList.size::: " + dbList.size());

        for (int i = 0; i < dbList.size(); i++) {

            IBIMS002BVO scrnObj = scrnList.get(i); // 화면에서 온 리스트 i번째 행
            IBIMS002BVO dbObj = dbList.get(i); // DB에서 쿼리돌려서 가져온 리스트의 i번째 행

            if (dbObj.getUseYn() == scrnObj.getUseYn() && dbObj.getDelYn() == scrnObj.getDelYn() && dbObj.getCdVlNm().equals(scrnObj.getCdVlNm())) { // DB에서의 코드값명이랑 화면에서 받아온 코드값명이랑 같은지 확인

            } else {

                /* parameter setting start */
                IBIMS002BVO ibims002bvo = new IBIMS002BVO(); // 바뀐 정보를 받을 새로운 파라미터

                // 화면에서 넘어온 코드명, 그룹코드, 코드ID를 세팅
                ibims002bvo.setCdVlNm(scrnObj.getCdVlNm());
                ibims002bvo.setUseYn(scrnObj.getUseYn());
                ibims002bvo.setDelYn(scrnObj.getDelYn());
                ibims002bvo.setCmnsCdGrp(scrnObj.getCmnsCdGrp());
                ibims002bvo.setCdVlId(scrnObj.getCdVlId());
                /* parameter setting end */

                log.debug("업데이트 행 발견!!!");
                log.debug("setCmnsCdGrp::: " + scrnObj.getCmnsCdGrp());
                log.debug("setCdVlId::: " + scrnObj.getCdVlId());
                log.debug("코드값명 ::: " + scrnObj.getCdVlNm());

                // update문이 들어가야함
                int updateRslt = ibims002BMapper.saveCodeInfo(ibims002bvo); // ibims002bvo에 업데이트할 코드명, 그룹코드, 코드id를
                                                                            // 세팅했으니까 그걸 집어넣어
                // rslt += 1;

                if (updateRslt <= 0) {// 0:: 오류
                    rslt = 0;
                } else {
                    rslt = 2; // 2:: 업데이트할 행이 있고 오류도 안남
                }

            }

        }

        return rslt; // 업데이트할 행이 없으면 153줄 분기에서 이미 걸러졌어야함.
    }

}
