package com.nanuri.rams.business.assessment.tb02.tb02030;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.WfMapVo;
import com.nanuri.rams.com.dto.WFMapDTO;
import com.nanuri.rams.com.dto.WFStepDTO;
import com.nanuri.rams.com.dto.WorkFlowDTO;

@Service
public interface TB02030Service {
    
    //WF MAP 조회
    public List<WFMapDTO> getWfMapInfo(String wfMapNm);

    //WF MAP 저장
    public int insertWfMapInfo(List<WorkFlowDTO> insertInfo);

    //WF MAP 삭제
    public int deleteWfMapInfo(List<String> deleteInfo);

    //WF MAP 수정
    public int updateWfMapInfo(List<WfMapVo> updateInfo);

    //WF STEP 조회
    public List<WorkFlowDTO> getWfStepInfo(String wfMapId);

    //WF STEP 저장
    public int wfStepRgst(List<WorkFlowDTO> insertInfo);

    //WF STEP 삭제
    public int deleteWfStepInfo(List<WFStepDTO> deleteInfo);

    //WF_STEP 수정
    public int updateWStepInfo(List<WFStepDTO> updateInfo);
}
