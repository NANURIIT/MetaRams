package com.nanuri.rams.business.common.vo;

import com.nanuri.rams.com.dto.WFMapDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WfMapVo extends WFMapDTO{

    private String originalWfMapId;  // 화면 전용 필드(수정시 id값 필요)
}
