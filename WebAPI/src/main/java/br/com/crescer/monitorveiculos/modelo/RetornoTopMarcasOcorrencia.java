package br.com.crescer.monitorveiculos.modelo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RetornoTopMarcasOcorrencia {

    private String nomeOcorrencia;

    private Long numeroOcorrencia;
}
