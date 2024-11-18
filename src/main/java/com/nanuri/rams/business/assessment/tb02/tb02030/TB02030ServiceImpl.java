package com.nanuri.rams.business.assessment.tb02.tb02030;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.WorkFlowMapper;
import com.nanuri.rams.business.common.vo.WfMapVo;
import com.nanuri.rams.com.dto.WFMapDTO;
import com.nanuri.rams.com.dto.WFStepDTO;
import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB02030ServiceImpl implements TB02030Service {

    private final WorkFlowMapper workFlowMapper;
    
    //WF MAP 조회
    @Override
    public List<WFMapDTO> getWfMapInfo(String wfMapNm) {
        return workFlowMapper.getWfMapInfo(wfMapNm);
    }

    //WF MAP 저장
    @Override
    public int insertWfMapInfo(List<WorkFlowDTO> insertInfo) {
        return workFlowMapper.wfMapRgst(insertInfo);
    }

    //WF MAP 삭제
    @Override
    public int deleteWfMapInfo(List<String>deleteInfo) {
        return workFlowMapper.deleteWfMapInfo(deleteInfo);
    }

    //WF MAP 수정
    @Override
    public int updateWfMapInfo(List<WfMapVo> updateInfo) {
        return workFlowMapper.updateWfMapInfo(updateInfo);
    }

    //WF STEP 조회
    @Override
    public List<WorkFlowDTO> getWfStepInfo(String wfMapId) {
        return workFlowMapper.getWfStepInfo(wfMapId);
    }

    //WF STEP 등록
    @Override
    public int wfStepRgst(List<WorkFlowDTO> insertInfo) {
        return workFlowMapper.wfStepRgst(insertInfo);
    }

    //WF STEP 삭제
    @Override
    public int deleteWfStepInfo(List<WFStepDTO> deleteInfo) {
        return workFlowMapper.deleteWfStepInfo(deleteInfo);
    }

    //WF STEP 수정
    @Override
    public int updateWStepInfo(List<WFStepDTO> updateInfo) {
        return workFlowMapper.updateWStepInfo(updateInfo);
    }
    
}
