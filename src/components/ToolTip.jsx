import { useTip } from "../context/toolTip.context";
import React from 'react';
import ChatTooltip from "./tooltip/ChatTooltip";

// Componente principal
export default function TooltipChatDemo() {
    const { tooltipState, } = useTip();

    return (
        <>
            {/* Overlay con blur */}
            {
                tooltipState.isVisible && (
                    <div
                        className={`fixed inset-0 bg-black z-30 transition-all duration-500 pointer-events-none ${tooltipState.isFadingOut
                            ? 'bg-opacity-0 backdrop-blur-none'
                            : 'bg-opacity-20 backdrop-blur-sm'
                            }`}
                        style={{
                            animation: tooltipState.isFadingOut
                                ? 'fadeOutBlur 0.5s ease-out'
                                : 'fadeInBlur 0.5s ease-in'
                        }}
                    />
                )
            }

            {/* Tooltip */}
            {
                tooltipState.isVisible && (
                    <ChatTooltip
                        isVisible={tooltipState.isVisible}
                        isFadingOut={tooltipState.isFadingOut}
                    />
                )
            }

            {/* Estilos de animación */}
            <style>{`
        @keyframes fadeInBlur {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        @keyframes fadeOutBlur {
          from {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100px);
          }
        }

        @keyframes pulseDown {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(8px) scale(1.3);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </>
    );
}