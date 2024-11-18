package com.nanuri.rams.com.WF;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.mapper.WorkFlowMapper;
import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class WorkFlow {

    /* WF */
    @Autowired
    private final WorkFlowMapper workFlowMapper;
    
    /**
	 * WF맵 등록
	 * @param WorkFlowDTO
	 * @return
	 */
    public int wfMapRgst(List<WorkFlowDTO> workFlowDTOs){

        // String tableNm = workFlowDTO.getJobTable();         //작업 테이블 명

        // List<String> pkList = new ArrayList<>();            //테이블 PK리스트

        // pkList = workFlowMapper.getPKList(tableNm);
        // String jobTableKey = String.join("||", pkList);

        // workFlowDTO.setJobTableKey(jobTableKey);

        // return workFlowMapper.wfMapRgst(workFlowDTO);

        List<WorkFlowDTO> paramList = new ArrayList<>();

        for(int i=0; i < workFlowDTOs.size(); i++){
            WorkFlowDTO workFlowDTO = workFlowDTOs.get(i);
            WorkFlowDTO paramDTO = new WorkFlowDTO();

            String tableNm = workFlowDTO.getJobTable();         //작업 테이블 명

            List<String> pkList = new ArrayList<>();            //테이블 PK리스트

            pkList = workFlowMapper.getPKList(tableNm);
            String jobTableKey = String.join("||", pkList);

            paramDTO.setJobTableKey(jobTableKey);                   //작업테이블 PK
            paramDTO.setJobTable(tableNm);                          //작업테이블 
            paramDTO.setWfMapId(workFlowDTO.getWfMapId());          //WF_MAP ID
            paramDTO.setWfMapNm(workFlowDTO.getWfMapNm());          //WF_MAP 명
            paramDTO.setRegUserId(workFlowDTO.getRegUserId());      //등록자
            paramDTO.setChgDttm(workFlowDTO.getChgDttm());          //변경일시
            paramDTO.setChgUserId(workFlowDTO.getChgUserId());      //변경자

            paramList.add(paramDTO);

        }

        return workFlowMapper.wfMapRgst(paramList);
    }

    /**
	 * WF스텝 등록
	 * @param WorkFlowDTOList List<WorkFlowDTO>
	 * @return
	 */
    public int wfStepRgst(List<WorkFlowDTO> workFlowDTOList){
        return workFlowMapper.wfStepRgst(workFlowDTOList);
    }

    /**
	 * WF 등록
	 * @param WorkFlowDTO
	 * @return
	 */
    public int wfRgst(WorkFlowDTO workFlowDTO){

        // UUID wfId = UUID.randomUUID();

        // log.debug("wfId.toString(): " + wfId.toString());

        // workFlowDTO.setWfId(wfId.toString());

        int wfRgstRslt = workFlowMapper.wfRgst(workFlowDTO);

        int wfHisRgstRslt = 0;
        if(wfRgstRslt > 0){
            wfHisRgstRslt = workFlowMapper.wfHisRgst(workFlowDTO);

        }else{
            log.debug("WF 등록 실패!!!!");
        }

        return wfHisRgstRslt;
    }

    public int wfAuthIdCheck(WorkFlowDTO param){
        return workFlowMapper.wfAuthIdCheck(param);
    }

}
